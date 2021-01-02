import React from 'react'
import PropTypes from 'prop-types'
import CanvasScene from 'modules/three/CanvasScene'
// const DemoScene = dynamic(() => import('@/modules/three/DemoScene'))
// modules/three/DemoScene.js
import renderHTML from 'react-render-html';
import asset from 'plugins/assets/asset';
import ImportJs from 'plugins/import-js/ImportJs';
import MasterPageBasic from '@/components/website/master/MasterPageBasic';

const scriptContent = `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script defer src="${asset("/scripts/ammo/ammo.wasm.js")}"></script>
`

const TestScenePage = props => {
    return (
        <MasterPageBasic
            externalScripts={[{ type: "", src: "/scripts/ammo/ammo.wasm.js" }]}
        >
            <CanvasScene/>
        </MasterPageBasic>

    )
}

TestScenePage.propTypes = {

}

export default TestScenePage
