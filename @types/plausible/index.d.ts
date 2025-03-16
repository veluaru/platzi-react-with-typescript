type Options = {
    callback?: () => void
    props: Record<string, string | number | undefined>
}

interface Window {
    // We can also set specific strings that can be used like 'add_fox'
    plausible: (event: 'add_fox', options?: Options) => void
}