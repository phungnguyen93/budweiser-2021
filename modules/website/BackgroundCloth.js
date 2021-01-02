import * as THREE from 'three';
import Object3DExtend from 'plugins/three/Object3DExtend'
import Pool from 'plugins/three/Pool';
import ObjectManager from 'plugins/three/ObjectManager';
import App3D from 'plugins/three/App3D';
import ButtonDebug from 'plugins/three/components/ButtonDebug';
import AssetManager from 'plugins/three/AssetManager';
import TBrowser from 'plugins/teexii/TBrowser';
import AppEvent from 'plugins/three/AppEvent';
import MathExtra from 'plugins/utils/MathExtra';

/**
 * NEED ADD CLASS BackgroundCloth TO pool/DynamicClass
 */
export default class BackgroundCloth extends Object3DExtend {

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

    CLOTH_WIDTH = 32;
    CLOTH_HEIGHT = 32;



    setupCameraPosition() {
        const camera = ObjectManager.get("camera");
        ObjectManager.get("scene").add(camera)
        // camera.rotateY(Math.PI / 2);
        camera.rotation.set(0, Math.PI / 2, 0);
        camera.position.x = 5;
        camera.position.y = this.CLOTH_HEIGHT / 2 - 6;
        camera.position.z = -this.CLOTH_WIDTH / 2;
    }



    #awake() {

        const scope = this;

        // Physics variables
        const gravityConstant = - 9.8
        let physicsWorld;
        const rigidBodies = [];
        const margin = 0.05;
        let hinge;
        let cloth;
        let transformAux1;

        let armMovement = 0;

        let textureLoader = new THREE.TextureLoader();

        let cube;
        let arm;
        const camera = ObjectManager.get("camera");
        const renderer = ObjectManager.get("renderer");


        initPhysics();
        createObjects();


        let willDt = 2;
        let dt = 0.3;
        let isFirstUpdate = true;
        App3D.addEvent(AppEvent.BEFORE_RENDER, function (e) {
            if (isFirstUpdate) {
                willDt -= dt;
                willDt = willDt <= e.delta ? e.delta : willDt;
                if (willDt <= e.delta) {
                    isFirstUpdate = false;
                }
            } else {
                willDt = e.delta;
            }

            updatePhysics(willDt, e.time);

        })






        function initPhysics() {

            // Physics configuration

            const collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
            const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
            const broadphase = new Ammo.btDbvtBroadphase();
            const solver = new Ammo.btSequentialImpulseConstraintSolver();
            const softBodySolver = new Ammo.btDefaultSoftBodySolver();
            physicsWorld = new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
            physicsWorld.setGravity(new Ammo.btVector3(0, gravityConstant, 0));
            physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, gravityConstant, 0));

            transformAux1 = new Ammo.btTransform();

        }

        function createObjects() {

            const pos = new THREE.Vector3();
            const quat = new THREE.Quaternion();

            const mobile = {
                offset: { x: 2.05, y: 1.6 },
                repeat: { x: 4.6, y: 3.5 }
            }

            const desktop = {
                offset: { x: 1.46, y: 2.6 },
                repeat: { x: 2.2, y: 2.2 }
            }

            async function testMaterial(texture) {

                const list = [
                    {
                        key1: "offset",
                        key2: "x",
                        init: mobile.offset.x,
                    }, {
                        key1: "offset",
                        key2: "y",
                        init: mobile.offset.y,
                    }, {
                        key1: "repeat",
                        key2: "x",
                        init: mobile.repeat.x,
                    }, {
                        key1: "repeat",
                        key2: "y",
                        init: mobile.repeat.y,
                    }
                ]

                // addAnimationTest();

                function addAnimationTest() {
                    const TYPE = "Material Envi Test";

                    ButtonDebug.addButtonToggleListByType(TYPE, addList)

                    function addList() {
                        let arr = []
                        list.map((item, index) => {
                            arr.push({
                                title: `${item.key1} ${item.key2}`,
                                type: TYPE,
                                isButton: false,
                                isSlider: true,
                                min: 0,
                                max: 8,
                                step: .05,
                                init: item.init,
                                fn: (value) => {
                                    texture[item.key1][item.key2] = value
                                },
                            })
                        })

                        ButtonDebug.addActions(arr)
                    }
                }
            }

            // });
            // let sw = ObjectManager.get("sw");
            // The cloth
            // Cloth graphic object
            const CLOTH_WIDTH = scope.CLOTH_WIDTH
            const CLOTH_HEIGHT = scope.CLOTH_HEIGHT

            const SCL = .5
            const clothNumSegmentsZ = scope.CLOTH_WIDTH * SCL;
            const clothNumSegmentsY = scope.CLOTH_HEIGHT * SCL;
            const clothPos = new THREE.Vector3(0, 0, 0);


            const clothGeometry = new THREE.PlaneBufferGeometry(CLOTH_WIDTH, CLOTH_HEIGHT, clothNumSegmentsZ, clothNumSegmentsY);
            // clothGeometry.rotateY(Math.PI * 0.5);
            clothGeometry.translate(clothPos.x, clothPos.y + CLOTH_HEIGHT * 0.5, clothPos.z - CLOTH_WIDTH * 0.5);

            // const clothMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
            const clothMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
            cloth = new THREE.Mesh(clothGeometry, clothMaterial);
            cloth.castShadow = false;
            cloth.receiveShadow = false;
            scope.add(cloth);

            var texture = AssetManager.get("Budweiser_homepage_BG.png");
            texture.wrapS = THREE.MirroredRepeatWrapping;
            texture.wrapT = THREE.MirroredRepeatWrapping;
            // texture.offset.set(-.65, -.65);
            // texture.repeat.set(2, 2);
            cloth.material.map = texture;
            cloth.material.needsUpdate = true;
            testMaterial(texture);

            if (TBrowser.isMobile()) {
                texture.offset.copy(mobile.offset)
                texture.repeat.copy(mobile.repeat)
            } else {
                texture.offset.copy(desktop.offset)
                texture.repeat.copy(desktop.repeat)
            }
            // });

            // Cloth physic object
            const softBodyHelpers = new Ammo.btSoftBodyHelpers();
            const clothCorner00 = new Ammo.btVector3(clothPos.x, clothPos.y + CLOTH_HEIGHT, clothPos.z);
            const clothCorner01 = new Ammo.btVector3(clothPos.x, clothPos.y + CLOTH_HEIGHT, clothPos.z - CLOTH_WIDTH);
            const clothCorner10 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z);
            const clothCorner11 = new Ammo.btVector3(clothPos.x, clothPos.y, clothPos.z - CLOTH_WIDTH);
            const clothSoftBody = softBodyHelpers.CreatePatch(physicsWorld.getWorldInfo(), clothCorner00, clothCorner01, clothCorner10, clothCorner11, clothNumSegmentsZ + 1, clothNumSegmentsY + 1, 0, true);
            const sbConfig = clothSoftBody.get_m_cfg();
            sbConfig.set_viterations(10);
            sbConfig.set_piterations(10);

            clothSoftBody.setTotalMass(0.9, false);
            Ammo.castObject(clothSoftBody, Ammo.btCollisionObject).getCollisionShape().setMargin(margin * 3);
            physicsWorld.addSoftBody(clothSoftBody, 1, - 1);
            cloth.userData.physicsBody = clothSoftBody;
            // Disable deactivation
            clothSoftBody.setActivationState(4);

            // The base
            const armMass = 2;
            const armLength = CLOTH_WIDTH;
            const pylonHeight = clothPos.y + CLOTH_HEIGHT;
            const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });


            pos.set(clothPos.x, 0.1, clothPos.z - armLength);
            quat.set(0, 0, 0, 1);
            // const base = createParalellepiped(1, 0.2, 1, 0, pos, quat, baseMaterial);
            // base.castShadow = false;
            // base.receiveShadow = false;
            // pos.set(clothPos.x, 0.5 * pylonHeight, clothPos.z - armLength);
            const pylon = createParalellepiped(0.4, pylonHeight, 0.4, 0, pos, quat, baseMaterial);
            pylon.castShadow = false;
            pylon.receiveShadow = false;
            pos.set(clothPos.x, pylonHeight + 0.2, clothPos.z - 0.5 * armLength);
            arm = createParalellepiped(0.4, 0.4, armLength + 0.4, armMass, pos, quat, baseMaterial);
            arm.castShadow = false;
            arm.receiveShadow = false;

            // Glue the cloth to the arm
            const influence = 0.5;
            const MAX = 10;
            for (var i = 0; i < MAX; i++) {
                clothSoftBody.appendAnchor(clothNumSegmentsZ * (i / (MAX - 1)), arm.userData.physicsBody, false, influence);

            }


            // Hinge constraint to move the arm
            const pivotA = new Ammo.btVector3(0, pylonHeight * 0.5, 0);
            const pivotB = new Ammo.btVector3(0, - 0.2, - armLength * 0.5);
            const axis = new Ammo.btVector3(0, 1, 0);
            hinge = new Ammo.btHingeConstraint(pylon.userData.physicsBody, arm.userData.physicsBody, pivotA, pivotB, axis, axis, true);
            physicsWorld.addConstraint(hinge, true);


            //


            // // camera.position.set(.5, clothHeight - 1, -(clothWidth / 2 - 2));
            // const material = new THREE.MeshPhongMaterial({ color: 0x4ac341, flatShading: true });
            // const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
            // cube = new THREE.Mesh(geometry, material);
            // cube.position.set(5, -clothHeight / 2, 0)
            // arm.add(cube);

            // camera.rotateY(Math.PI / 2);
            // camera.position.x = 5;
            // camera.position.y = clothHeight / 2 - 6;
            // camera.position.z = -clothWidth / 2;

            scope.setupCameraPosition()

        }




        function createParalellepiped(sx, sy, sz, mass, pos, quat, material) {
            // material.transparent = true;
            // material.opacity = 0;
            // material.visible = false
            const threeObject = new THREE.Mesh(new THREE.BoxBufferGeometry(sx, sy, sz, 1, 1, 1), material);
            const shape = new Ammo.btBoxShape(new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5));
            shape.setMargin(margin);

            createRigidBody(threeObject, shape, mass, pos, quat);

            return threeObject;

        }

        function createRigidBody(threeObject, physicsShape, mass, pos, quat) {

            threeObject.position.copy(pos);
            threeObject.quaternion.copy(quat);

            const transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
            transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
            const motionState = new Ammo.btDefaultMotionState(transform);

            const localInertia = new Ammo.btVector3(0, 0, 0);
            physicsShape.calculateLocalInertia(mass, localInertia);

            const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, physicsShape, localInertia);
            const body = new Ammo.btRigidBody(rbInfo);

            threeObject.userData.physicsBody = body;

            scope.add(threeObject);

            if (mass > 0) {

                rigidBodies.push(threeObject);

                // Disable deactivation
                body.setActivationState(4);

            }

            physicsWorld.addRigidBody(body);

        }

        function createRandomColor() {

            return Math.floor(Math.random() * (1 << 24));

        }

        function createMaterial() {

            return new THREE.MeshPhongMaterial({ color: createRandomColor() });

        }


        let MIN_SPEED = 0.02;
        let TEMP_MIN_SPEED = 0.02;
        let speed = MIN_SPEED;
        let velocity = 0.01;
        const accelarator = .005;

        let sign = 1;

        document.body.addEventListener('mousedown', onmousedown, false);

        function onmousedown() {
            movingBackground();
        }


        function movingBackground() {
            speed = 1;
            velocity = .05;
            TEMP_MIN_SPEED = MIN_SPEED * 10;
        }


        function updatePhysics(deltaTime, time) {

            velocity -= accelarator;

            TEMP_MIN_SPEED -= accelarator;

            TEMP_MIN_SPEED = TEMP_MIN_SPEED < MIN_SPEED ? MIN_SPEED : TEMP_MIN_SPEED;

            speed = Math.abs(speed) + velocity;


            if (Math.abs(speed) >= TEMP_MIN_SPEED) {
                speed = TEMP_MIN_SPEED;
                velocity = 0;
            }

            speed = Math.abs(speed) * sign;

            hinge.enableAngularMotor(true, speed);

            if (Math.abs(arm.rotation.y) > MathExtra.degToRad(1)) {
                sign = Math.abs(sign) * -Math.sign(arm.rotation.y);
            }


            physicsWorld.stepSimulation(deltaTime, 10);


            // Update cloth
            const softBody = cloth.userData.physicsBody;
            const clothPositions = cloth.geometry.attributes.position.array;
            const numVerts = clothPositions.length / 3;
            const nodes = softBody.get_m_nodes();
            let indexFloat = 0;

            for (let i = 0; i < numVerts; i++) {

                const node = nodes.at(i);
                const nodePos = node.get_m_x();
                clothPositions[indexFloat++] = nodePos.x();
                clothPositions[indexFloat++] = nodePos.y();
                clothPositions[indexFloat++] = nodePos.z();

            }

            cloth.geometry.computeVertexNormals();
            cloth.geometry.attributes.position.needsUpdate = true;
            cloth.geometry.attributes.normal.needsUpdate = true;

            // Update rigid bodies
            for (let i = 0, il = rigidBodies.length; i < il; i++) {

                const objThree = rigidBodies[i];
                const objPhys = objThree.userData.physicsBody;
                const ms = objPhys.getMotionState();
                if (ms) {

                    ms.getWorldTransform(transformAux1);
                    const p = transformAux1.getOrigin();
                    const q = transformAux1.getRotation();
                    objThree.position.set(p.x(), p.y(), p.z());
                    objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
                }

            }

        }
    }

}