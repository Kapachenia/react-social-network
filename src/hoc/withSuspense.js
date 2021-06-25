import React, {Suspense} from "react";
import Preloader from "../common/Preloader/Proloader";

// hok - это функция, которая принимает компонент и возвращает компонент

export const withSuspense = (Component) => {

    return (props) => {
        return <Suspense fallback={<Preloader />}>
            <Component {...props} />
        </Suspense>
    };
}

export default withSuspense;