/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"


interface props {
    fn: () => void,
    trigger: any[]
}

const useEffectAfterMount = (fn: props["fn"], trigger: props["trigger"] = []) => {

    const isMounted = useRef(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
            return
        }

        fn()
    }, trigger)

}

export default useEffectAfterMount
