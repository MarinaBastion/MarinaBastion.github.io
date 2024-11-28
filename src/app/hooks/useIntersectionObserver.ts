import { DependencyList, useCallback, useRef } from "react"

export default function useIntersectionObserver<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList
) {
  const observer = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: T) => {
        debugger;
        if (deps.every((x) => x === true)) return; 
      //if (deps.every(Boolean)) {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) callback()
        })
        if (node) observer.current.observe(node)
      
    },
    [deps, callback]
  )
  return ref
}