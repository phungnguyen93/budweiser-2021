import * as THREE from 'three';
import Object3DExtend from 'plugins/three/Object3DExtend'
import Pool from 'plugins/three/Pool';
import App3D from 'plugins/three/App3D';
import AppEvent from 'plugins/three/AppEvent';
import asset from 'plugins/assets/asset';
import TBrowser from 'plugins/teexii/TBrowser';

const vertexshader = `attribute float size;

varying vec3 vColor;

void main() {

    vColor = color;

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_PointSize = size * ( 300.0 / -mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;

}`

const fragmentshader = `

uniform sampler2D pointTexture;

varying vec3 vColor;

void main() {

    gl_FragColor = vec4( vColor, 1.0 );

    gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

}`

/**
 * NEED ADD CLASS Falling TO pool/DynamicClass
 */
export default class Falling extends Object3DExtend {

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

    #awake() {
        const scope = this;


        let particleSystem, uniforms, geometry;

        const particles = TBrowser.isMobile() ? 50000 : 5000;

        uniforms = {

            pointTexture: { value: new THREE.TextureLoader().load(asset("/images/textures/glow.png")) }

        };


        const shaderMaterial = new THREE.ShaderMaterial({

            uniforms: uniforms,
            vertexShader: vertexshader,
            fragmentShader: fragmentshader,

            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true,

            opacity: .7,

        });

        const radius = 1000;

        geometry = new THREE.BufferGeometry();

        const positions = [];
        const colors = [];
        const sizes = [];

        const color = new THREE.Color();

        for (let i = 0; i < particles; i++) {

            positions.push((Math.random() * 2 - 1) * radius);
            positions.push((Math.random() * 2 - 1) * radius);
            positions.push((Math.random() * 2 - 1) * radius);

            color.setHSL(i / particles, 1.0, 0.5);

            colors.push(1, 1, 1);

            sizes.push(1);

        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage));

        particleSystem = new THREE.Points(geometry, shaderMaterial);

        scope.add(particleSystem);


        App3D.addEvent(AppEvent.BEFORE_RENDER, update);

        function update() {

            const time = Date.now() * 0.005;

            particleSystem.rotation.z = 0.03 * time;
            // particleSystem.rotation.x = -0.001 * time;

            const sizes = geometry.attributes.size.array;

            for (let i = 0; i < particles; i++) {

                sizes[i] = 6 * (1 + Math.sin(0.1 * i + time));

            }

            geometry.attributes.size.needsUpdate = true;
        }
    }

}