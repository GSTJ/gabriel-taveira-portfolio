# Fonts

All are SIL Open Font License 1.1, from Google Fonts' latin variable files.

| File                                     | Family              | Kept                                                                                              | Size       |
| ---------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------- | ---------- |
| `bricolage.woff2`                        | Bricolage Grotesque | `wght` 300 to 700, `wdth` 90 to 100, full `opsz`                                                  | 108 KB     |
| `caveat.woff2`                           | Caveat              | static 560                                                                                        | 49 KB      |
| `bricolage-text-400.woff2`, `-640.woff2` | Bricolage Grotesque | static `wght` 400 / 640, `wdth` 100, `opsz` 12, renamed "Bricolage Grotesque Text" Regular / Bold | 19 KB each |

The two `bricolage-text` files are for `/resume` and the PDF printed from it. Chrome prints a variable font as Type 3 glyphs, which ATS parsers can't read; a static instance embeds as TrueType with a Unicode map. The rename matters too: the instancer keeps the variable font's default name ("96pt ExtraBold"), and parsers such as OpenResume read "Bold" in a font name as bold text, which is how they find the name and the section titles.

Regenerate (fonttools with brotli):

```sh
fonttools varLib.instancer bricolage-latin.woff2 wght=300:700 wdth=90:100 -o b.ttf
fonttools varLib.instancer caveat-latin.woff2 wght=560 -o c.ttf
U="U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212"
pyftsubset b.ttf --unicodes=$U --layout-features=kern,liga,calt,tnum,lnum,case --flavor=woff2 --output-file=bricolage.woff2
pyftsubset c.ttf --unicodes=$U --layout-features=kern,liga,calt --flavor=woff2 --output-file=caveat.woff2
```

The resume's static instances, from `bricolage.woff2` itself:

```sh
for style in 400:Regular 640:Bold; do
  w=${style%:*} name=${style#*:}
  fonttools varLib.instancer bricolage.woff2 wght=$w wdth=100 opsz=12 -o t$w.ttf
  python3 -c "import sys; from fontTools.ttLib import TTFont; w,s=sys.argv[1:]; f=TTFont(f't{w}.ttf'); n=f['name']; n.names=[r for r in n.names if r.nameID not in (1,2,3,4,6,16,17,25)]; [n.setName(v,i,3,1,0x409) for i,v in ((1,'Bricolage Grotesque Text'),(2,s),(3,f'BricolageGrotesqueText-{s}'),(4,f'Bricolage Grotesque Text {s}'),(6,f'BricolageGrotesqueText-{s}'))]; f.save(f't{w}.ttf')" $w $name
  pyftsubset t$w.ttf --unicodes=$U --layout-features=kern,liga,calt,tnum,lnum,case --flavor=woff2 --output-file=bricolage-text-$w.woff2
done
```

Bricolage has no arrow glyphs, so the resume writes ranges with "to".

A weight or width outside those ranges renders clamped. Widen the instance before reaching for one.
