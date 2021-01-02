import * as THREE from 'three';
import Object3DExtend from 'plugins/three/Object3DExtend'
import Pool from 'plugins/three/Pool';
import AssetManager from 'plugins/three/AssetManager';
import MathExtra from 'plugins/utils/MathExtra';
const TWEEN = require('@tweenjs/tween.js')

/**
 * NEED ADD CLASS ParticleFirework TO pool/DynamicClass
 */
export default class ParticleFirework extends Object3DExtend {

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


    #center = null;
    get center() { return this.#center; }
    set center(value) { this.#center = value; }

    #holderElement = null;
    get holderElement() { return this.#holderElement; }
    set holderElement(value) { this.#holderElement = value; }

    #SIZE = 100;
    get SIZE() { return this.#SIZE; }
    set SIZE(value) { this.#SIZE = value; }

    #delay = true;
    get delay() { return this.#delay; }
    set delay(value) { this.#delay = value; }


    #awake() {

        const scope = this;

        const SIZE = this.#SIZE = this.props.size || 200;


        const OPTION_MATERIAL = {
            depthWrite: false, depthTest: false,
            transparent: true,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending,
            opacity: MathExtra.randFloat(.8, 1)
        }

        let holderElement = this.#holderElement = new THREE.Object3D();
        scope.add(holderElement);

        let holderCenter = new THREE.Object3D();
        scope.add(holderCenter);

        let geometry = new THREE.PlaneBufferGeometry(SIZE, SIZE, 4);
        let material = new THREE.MeshBasicMaterial({ map: AssetManager.get("fw-center.png"), ...OPTION_MATERIAL });
        let plane = this.#center = new THREE.Mesh(geometry, material);
        holderCenter.add(plane);

        const MAX = 30;
        const min = (1 / (MAX - 1)) * Math.PI;
        for (let i = 0; i < MAX; i++) {

            let holder = new THREE.Object3D();
            holderElement.add(holder);

            let url = Math.random() <= .7 ? "fw-line.png" : "fw-dot.png";
            material = new THREE.MeshBasicMaterial({ map: AssetManager.get(url), ...OPTION_MATERIAL });
            plane = new THREE.Mesh(geometry, material)

            holder.add(plane);
        }

        this.initStat();
    }

    initStat() {

        const SIZE = this.#SIZE = this.props.size || 200;

        let center = this.#center;

        center.rotation.z = MathExtra.rand(Math.PI)
        center.scale.setScalar(0);

        const MAX = this.#holderElement.children.length;
        const min = (1 / (MAX - 1)) * Math.PI / 2;


        for (let i = 0; i < MAX; i++) {

            const holder = this.#holderElement.children[i];
            const plane = holder.children[0];

            plane.material.opacity = 1;
            plane.position.x = 0;
            plane.scale.setScalar(0);

            holder.rotation.z = Math.PI * 2 * (i / (MAX - 1)) + MathExtra.rand(min / 2);
        }

    }

    animate() {

        const scope = this;

        this.initStat();

        let tween;
        let center = this.#center;

        const SIZE = this.#SIZE;

        const MAX = this.#holderElement.children.length;
        const min = (1 / (MAX - 1)) * Math.PI;


        let delay = this.delay = this.props.delay || 0,
            duration = 600;

        tween = new TWEEN.Tween(center) // Create a new tween that modifies 'coords'.
            .delay(delay)
            .to({
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            }, duration) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Back.Out) // Use an easing function to make the animation smooth.
            .start() //
            .onComplete((params) => {
                tween = new TWEEN.Tween(center) // Create a new tween that modifies 'coords'.
                    .to({
                        scale: { x: 0, y: 0, z: 0 },
                    }, duration / 2) // Move to (300, 200) in 1 second.
                    .easing(TWEEN.Easing.Back.In) // Use an easing function to make the animation smooth.
                    .start() //
                    .onComplete((params) => {
                        setTimeout(() => {
                            scope.clearChild();

                        }, 500);
                    })
            })


        for (let i = 0; i < MAX; i++) {

            const SCALE = MathExtra.randFloat(.3, 1);

            const holder = this.#holderElement.children[i];
            const item = holder.children[0];

            const _delay = delay + (MathExtra.randFloat(0, 300));
            duration = 700;

            tween = new TWEEN.Tween(item) // Create a new tween that modifies 'coords'.
                .delay(_delay)
                .to({
                    scale: { x: SCALE, y: SCALE, z: SCALE },
                    position: { x: SIZE },
                }, duration) // Move to (300, 200) in 1 second.
                .easing(TWEEN.Easing.Quintic.Out) // Use an easing function to make the animation smooth.
                .start() //

            tween = new TWEEN.Tween(item) // Create a new tween that modifies 'coords'.
                .delay(_delay + (duration / 2))
                .to({
                    material: { opacity: 0 },
                }, duration * .4) // Move to (300, 200) in 1 second.
                .easing(TWEEN.Easing.Quintic.Out) // Use an easing function to make the animation smooth.
                .start() //
        }


        // delay = 3000;
        // duration = 1000;

        // // center.rotation.z = MathExtra.rand(Math.PI * .5)
        // // rotation: { x: 0, y: 0, z: 0 },

        // let tween2 = new TWEEN.Tween(center) // Create a new tween that modifies 'coords'.
        //     .delay(delay)
        //     .to({
        //         rotation: { z: MathExtra.rand(Math.PI * .5) },
        //         // scale: { x: 0, y: 0, z: 0 },
        //     }, 1000) // Move to (300, 200) in 1 second.
        //     .easing(TWEEN.Easing.Sinusoidal.In) // Use an easing function to make the animation smooth.
        //     .start() //



    }
}