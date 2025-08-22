# Discussion

For `V1` of this project, I prioritized fixing initial bugs, creating a functioning user interface complete with initial branding, and implementing developer experience improvements that would expedite future development. While the project is stable, there is still far more work to be done. Here is a detailed list of improvements I would make it given more time.

## AI usage

I turned completions off for the implementation of `V1`. Once I build up more understanding of the stack and have a deep knowledge of the business logic of Solace, then I will feel comfortable enough to leverage LLMs for development. For initial round of development I find reducing reliance on LLMs and instead diving into documentation and writing code by hand is the best way to develop and understanding of the code base.

## Future Improvements

### Global state management

As the application expands and more components start depending on the Advocates that come back from the API, prop drilling will become unruly. Lifting state managed in `useState` and leveraging React Context as an initial state manager will allow for more concise and maintainable state management.

### Implement routing for Advocate pages

Right now Advocate cards link to example pages. In the future, utilizing Next.js routing we can link to individual Advocate pages. Slugs for these Advocates would default to `${firstName}-${lastName}` unless a collision occurs.

```
app/advocates/[slug]/page.tsx
```

### Implement server side filtering to leverage cache for all users

The existing `searchCache` in `src/app/page.tsx` is useful, but it only caches search results for a single user. In the future, sending this search query to the backend, then caching results in Redis would allow us to spread the performance benefits of caching across all users. For example, if user A searches `anxiety`, we would query the database then cache their results. When user B searches `anxiety`, we have those results cached on the server and can send the cached results without hitting the database.

### Suspense for search

React Suspense allows us to build a UI that allows the user to continue to navigate and gain value from the site without having to wait for all subsections of the page to load. Right now, the page won't render anything in the card grid until the response from the server comes back. We could build a Suspense boundary around the card grid to create a `<Loading />` fallback that would display until asynchronous requests complete.

### Error boundaries for search

Similar to the above, we don't have boundaries around our component sections to prevent white screens if an error takes place somewhere in the component tree. Utilizing error boundaries, we contain errors to single components or component sections in order to allow the user to continue to use our site if unexpected behavior occurs.

### Implement field sorting for

_(ex. "sort by years active")_

There's no ability to sort advocates beyond their initial order when they return from the server. If users want to find the advocate that's been active the longest, they might want to sort by years active.

### Custom Hooks

Examples

- useSearch custom hook to improve maintainability of code
- useAdvocates custom hook to fetch

Custom hooks are react patterns that help encapsulate logic to singular react functions. We have a few options, listed above, that would encapsulate logic to allow multiple components to tap into said logic, and allow developers to iterate on said logic more quickly.

### Update page metadata for SEO

We haven't yet implemented much to enhance our SEO. Advocates my sign up for Solace for the increased visibility. We could utilize SEO basics like Schema markup, detailed titles and descriptions, image optimizations (when we get images) in order to help search engines favor the Solace search page.

### Enhanced filtering and searching

_(ex. click on specific "specialty" to filter)_

If a user clicks on a specialty in a card, it'd be nice if we set that specialty as the search value to allow them to search for that specialty. Further, we search advocate metadata for exact matches on keyword searches. If a user want to search "anxiety and trauma", they might not see results they expect. By searching for each individual keyword, we would build a more expected experience.
