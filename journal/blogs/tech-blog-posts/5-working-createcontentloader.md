---
title: Working createContentLoader
titleTemplate: Tech
---

# Working createContentLoader

Blog post about using createContentLoader in VitePress.

One of the things that I wanted is for VitePress automatically generate an index page of all blog posts that I added
without me having to manually update the index page.

VitePress offers a solution in the form of data loaders and even provide a specialized function `createContentLoader`.

The way its works is that during run/compilation time, these data loaders would run:

1. scan a designated location for a given glob
2. provide a list of file entries

Things to note are that, this will be a snapshot.  
Remember, VitePress is more of a static site generator.
