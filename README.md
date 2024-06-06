# [WIP] pulsar-ide-rust

Provides Rust support for [Pulsar](https://pulsar-edit.dev/) using
[rust-analyzer](https://rust-analyzer.github.io)

## About

This plugin only provides some of the functionality designated by the language
server protocol. This plugin currently enables many of the features supported by rust-analyzer.

All contributions and feedback are appreciated.

## Requirements

+ [Pulsar] 1.100 or later
+ [rust-analyzer] executable installed in your path

Autocompletion support via `autocomplete-plus` is built-in. If you’re running
Pulsar 1.113 or later, so is symbol search via `symbols-view` — symbols within
the document and the project, plus go-to-declaration functionality.

Other services can be consumed with various packages. You can install
[atom-ide-base] for the maximal experience, but I’d encourage you to pick and
choose a bit more carefully!
