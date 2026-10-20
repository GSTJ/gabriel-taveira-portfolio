# Fonts

Both are SIL Open Font License 1.1, from Google Fonts' latin variable files.

| File              | Family              | Kept                                             | Size   |
| ----------------- | ------------------- | ------------------------------------------------ | ------ |
| `bricolage.woff2` | Bricolage Grotesque | `wght` 300 to 700, `wdth` 90 to 100, full `opsz` | 108 KB |
| `caveat.woff2`    | Caveat              | static 560                                       | 49 KB  |

Regenerate (fonttools with brotli):

```sh
fonttools varLib.instancer bricolage-latin.woff2 wght=300:700 wdth=90:100 -o b.ttf
fonttools varLib.instancer caveat-latin.woff2 wght=560 -o c.ttf
U="U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212"
pyftsubset b.ttf --unicodes=$U --layout-features=kern,liga,calt,tnum,lnum,case --flavor=woff2 --output-file=bricolage.woff2
pyftsubset c.ttf --unicodes=$U --layout-features=kern,liga,calt --flavor=woff2 --output-file=caveat.woff2
```

A weight or width outside those ranges renders clamped. Widen the instance before reaching for one.
