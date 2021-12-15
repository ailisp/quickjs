#!/bin/bash
make qjsc
 ./qjsc examples/hello.js -c -o code.h -N code

defs='-D_GNU_SOURCE -DCONFIG_VERSION="2021-03-27" -DCONFIG_BIGNUM'
sources='builder.c quickjs.c libregexp.c libunicode.c cutils.c quickjs-libc-min.c libbf.c'
libs='-lm'
includes="-Istubs"

clang --target=wasm32-unknown-wasi \
    --sysroot $HOME/Downloads/pkg/wasi-libc \
    -nostartfiles -Os \
    ${defs} ${includes} ${sources} ${libs} \
    -Wl,--no-entry \
    -Wl,--export-all \
    -Wl,-z,stack-size=$[256 * 1024] \
    -o hello.wasm