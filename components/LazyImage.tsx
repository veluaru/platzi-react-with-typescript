import type { ReactElement } from "react"
import { useRef, useEffect, useState } from "react"
import type { ImgHTMLAttributes } from "react";

// The question mark means its an optional prop
type LazyImageProps = { src: string, title: string, onLazyLoad?: (img: HTMLImageElement) => void }

// We can also make this component a bit more generic, by letting the user use
// all the generic attributes from img without creating each one on the props.
// You also need to import the native attributes of the component, in this case is the
// native attributes of the img component. Remember to pass this attributes to the 
// component to use on.
type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>;

// And then we join the attributes we created for our component, the props, with 
// the native attributes of the img component, so the user can use whatever they want.
type Props = LazyImageProps & ImageNativeTypes;


export const LazyImage = ({ src, title, onLazyLoad, ...imgProps }: LazyImageProps): ReactElement => {
    // Its nice to add the type of the ref, in this case as the node is going to be
    // the node of and image, we add the corresponding type.
    // Also, we initialize it with null because at this point we still don't have
    // the image.
    const node = useRef<HTMLImageElement>(null);

    // We initiallize the image with a simple blank image that it's lightweight
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");

    const [isLazyLoaded, setIsLazyLoaded] = useState(false)
    // We make sure the next code is only excecuted in the client, when the component 
    // is mounted, otherwise it wouldn't make sense
    useEffect(() => {
        if (isLazyLoaded) {
            return
        }
        // New observer to check when the image its visible in the dom, and only then
        // load the image from api
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // onIntersection -> console.log
                if (entry.isIntersecting) {
                    console.log('Hey you! Image visible')
                    setCurrentSrc(src)
                    setIsLazyLoaded(true);
                    
                    if (onLazyLoad && node.current) {
                        onLazyLoad(node.current);
                    }
                }
            });
        })
        
        // Observe node
        // The current is only available when the node is mounted and the image
        // reference is on the node, that's why we use it inside the useEffect
        // We still use the if so typescript is sure it exists
        if (node.current) {
            observer.observe(node.current);
        }
        // Another way to do it is with '!': observer.observe(node.current!);


        //Disconect or clean the effect
        return () => {
            // wen its going to unmount, use the disconnect from the observer
            observer.disconnect()
        }
        // As we are using a prop inside the useEffect, we should add the prop
        // as shown bellow to update the effect in case the prop is updated.
    }, [src, isLazyLoaded, onLazyLoad])

    return <img ref={node} width={320} height="auto" src={currentSrc} className="mx-auto rounded-md bg-gray-300" alt={title} {...imgProps} />
}

// This is another way to call props but its not very scalable
// export const RandomFox = (props: {image: string}): ReactElement  => {
//     return <img width={320} height="auto" src={props.image} className="rounded"/>
// }