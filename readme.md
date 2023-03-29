# netlify-basic-auth-edge-function

> Netlify edge function, which password protects your site.

[Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/) run in a secure runtime based on [Deno](https://deno.land/). 

## Motivation

The Netlify free [pricing model](https://www.netlify.com/pricing/) does not include basic authentication headers to password protect your site.

## Usage

1. Create `netlify/edge-functions/basic-auth.ts` file in your repository:

Replace `LATEST_VERSION` with [the latest version](https://deno.land/x/netlify_basic_auth_edge_function).

```ts
// netlify/edge-functions/basic-auth.ts

export { handler as default } from 'https://deno.land/x/netlify_basic_auth_edge_function@LATEST_VERSION/mod.ts'
```

2. Add the following part to your `netlify.toml` file-based configuration:

```toml
[[edge_functions]]
    path = "/*"
    function = "basic-auth"
```

3. Set the following environment variable in Netlify settings to configure basic authentication:

- `BASIC_AUTH_CREDENTIALS` - space delimited *USERNAME*:*PASSWORD* list.

    Example: `john:strongpass1 johny:strongpass2`

> **NOTE**: If the environment variable is not set, the edge function will continue without authentication.

> **IMPORTANT**: We recommend rotating your passwords periodically.

### Custom edge functions folder

Please see the [Netlify documentation](https://docs.netlify.com/edge-functions/get-started/#edge-functions-directory) to see how you can configure a custom edge functions folder.
