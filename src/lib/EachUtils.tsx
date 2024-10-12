import React from 'react'

interface EachUtilsProps<T> {
    of: T[],
    render: (item: T, index: number) => React.ReactNode,
}

const EachUtils = <T,>({ of, render }: EachUtilsProps<T>) => {
    return of.map((item, index) => render(item, index))
}

export default EachUtils