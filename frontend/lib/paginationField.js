import { PAGINATION_QUERY } from '../components/Pagination';

// logic needed to keep pagination fetching/caching consistent for supporting deletion of product
//  instances on multi-product pages

const paginationField = () => ({
  keyArgs: false,
  read(existing = [], { args, cache }) {
    console.log({ existing, args, cache });
    const { skip, first } = args;

    // read the number of items on the page from the cache
    const data = cache.readQuery({ query: PAGINATION_QUERY });
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pages = Math.ceil(count / first);
    // check for existing items
    const items = existing.slice(skip, skip + first).filter((x) => x);

    if (items.length && items.length !== first && page === pages) {
      return items;
    }

    if (items.length !== first) {
      // we dont have items, must fetch them
      return false;
    }
    // if there are items, return them from the cache- no need to go to network
    if (items.length) {
      return items;
    }

    return false; // fallback
  },
  merge(existing, incoming, { args }) {
    const { skip, first } = args;
    // runs when apollo client comes back from network with our data.
    console.log(`merging items from the network ${incoming.length}`);
    const merged = existing ? existing.slice(0) : [];
    merged.push(incoming);
    for (let i = skip; i < skip + incoming.length; i++) {
      merged[i] = incoming[i - skip];
    }

    return merged;
  },
});

export default paginationField;
