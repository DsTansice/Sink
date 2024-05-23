# Sink Configuration

Sink provides some configuration options, which can be referred to in [.env.example](../.env.example).

## `NUXT_PUBLIC_PREVIEW_MODE`

Sets the site to demo mode, the generated links will expire after 24 hours, and the links cannot be edited or deleted.

## `NUXT_PUBLIC_SLUG_DEFAULT_LENGTH`

Sets the default length of the generated SLUG.

## `NUXT_REDIRECT_STATUS_CODE`

Redirects default to use HTTP 301 status code, you can set it to `302`/`307`/`308`.

## `NUXT_HOME_URL`

The default Sink homepage is the introduction page, you can replace it with your own website.
