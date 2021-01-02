import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import App2D from '../App2D';
import Pool from '../Pool';


const Bassic2DScene = props => {
    const appRef = useRef();

    useEffect(() => {
        // effect
        return () => {
            // cleanup
            App2D.dispose();
            Pool.dispose();
        }
    }, [])

    const init = (params) => {

        if (props.initListener) props.initListener.emit();
        if (props.onInit) props.onInit();
    }

    return (
        <App2D
            ref={appRef}

            appInit={init}

            {...props}
        />
    )
}

Bassic2DScene.propTypes = {

}

export default Bassic2DScene
