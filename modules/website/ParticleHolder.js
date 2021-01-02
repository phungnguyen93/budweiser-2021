import * as THREE from 'three';
import Object3DExtend from 'plugins/three/Object3DExtend'
import Pool from 'plugins/three/Pool';
import ParticleFirework from './ParticleFirework';
import ObjectManager from 'plugins/three/ObjectManager';
import MathExtra from 'plugins/utils/MathExtra';
import App3D from 'plugins/three/App3D';
import AppEvent from 'plugins/three/AppEvent';

/**
 * NEED ADD CLASS ParticleHolder TO pool/DynamicClass
 */
export default class ParticleHolder extends Object3DExtend {

    constructor(props) {
        super(props);
        this.props = props || {};

        if (Pool.findInactive(this.constructor.name)) {
            return Pool.get(this.constructor.name);
        } else {
            Pool.add(this);
            this.#awake();
        }
    }


    get POSX() {
        const sw = ObjectManager.get("sw");
        const scope = this;
        return MathExtra.randFloat(scope.MIN_X, scope.MAX_X);
    }

    #MAX_X = 0;
    get MAX_X() { return this.#MAX_X; }
    set MAX_X(value) { this.#MAX_X = value; }

    #MIN_X = 0;
    get MIN_X() { return this.#MIN_X; }
    set MIN_X(value) { this.#MIN_X = value; }

    #awake() {
        const sw = ObjectManager.get("sw");
        const scope = this;

        scope.MIN_X = 0;
        scope.MAX_X = sw / 2;

        const delay = this.props.delay || 3;
        const count = this.props.count || 3;

        let current = delay;
        let time = 0;

        App3D.addEvent(AppEvent.BEFORE_RENDER, update)

        function update(e) {
            time += e.delta;
            if (current < Math.floor(time)) {
                current = time;
                scope.createParticle();
                scope.createParticle(Math.random() * 1000);
                scope.createParticle(Math.random() * 1500);
                if (count == 5) {
                    scope.createParticle(Math.random() * 1500);
                    scope.createParticle(Math.random() * 1500);

                }
            }
        }

        scope.dispose = function () {
            console.log("dispose 1");
            App3D.removeEvent(AppEvent.BEFORE_RENDER, update)

        }

        // setInterval(() => {

        //     const sw = ObjectManager.get("sw");
        //     const sh = ObjectManager.get("sh");

        //     let parti = new ParticleFirework();
        //     parti.animate();
        //     parti.position.set(scope.POSX, MathExtra.rand(sh / 2), 0);
        //     parti.scale.setScalar(MathExtra.randFloat(.2, .5));
        //     scope.add(parti);

        //     parti = new ParticleFirework({ delay: Math.random() * 1000 });
        //     parti.animate();
        //     parti.position.set(scope.POSX, MathExtra.rand(sh / 2), 0);
        //     parti.scale.setScalar(MathExtra.randFloat(.2, .5));
        //     scope.add(parti);

        // }, 1000);

    }

    createParticle(delay) {

        const scope = this;

        const sw = ObjectManager.get("sw");
        const sh = ObjectManager.get("sh");

        let parti = new ParticleFirework({ delay });
        parti.animate();
        parti.position.set(scope.POSX, MathExtra.rand(sh / 2), 0);
        parti.scale.setScalar(MathExtra.randFloat(.2, .5));
        scope.add(parti);

    }

    // dispose() {

    // }
}