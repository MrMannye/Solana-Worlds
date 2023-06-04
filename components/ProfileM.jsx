import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Spinner } from '@chakra-ui/react'


const ProfileM = ({ model, size }) => {
    const refContainer = useRef()
    const loader = new GLTFLoader()
    const clock = new THREE.Clock();
    let mixer = null
    const [loading, setLoading] = useState(true)
    const [renderer, setRenderer] = useState()
    const [_camera, setCamera] = useState()
    const [target] = useState(new THREE.Vector3(-0.6, 0.2, 0))
    const [initialCameraPosition] = useState(
        new THREE.Vector3(
            20 * Math.sin(0.2 * Math.PI),
            10,
            20 * Math.cos(0.2 * Math.PI)
        )
    )
    const [scene] = useState(new THREE.Scene())
    const [_controls, setControls] = useState()

    const handleWindowResize = useCallback(() => {
        const { current: container } = refContainer
        if (container && renderer) {
            const scW = container.clientWidth
            const scH = container.clientHeight

            renderer.setSize(scW, scH)
        }
    }, [renderer])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const { current: container } = refContainer
        if (container && !renderer) {
            const scW = container.clientWidth
            const scH = container.clientHeight

            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            })
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(scW, scH)
            renderer.outputEncoding = THREE.sRGBEncoding
            container.appendChild(renderer.domElement)
            setRenderer(renderer)

            // 640 -> 240
            // 8   -> 6
            const scale = scH * 0.001 + 5.5
            const camera = new THREE.OrthographicCamera(
                -scale,
                scale,
                scale,
                -scale,
                0.01,
                50000
            )
            camera.position.copy(initialCameraPosition)
            camera.lookAt(target)
            setCamera(camera)

            const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5)
            // scene.background = new THREE.Color(0xbfe3dd )
            scene.add(ambientLight)

            loader.load(`${model}`, function (gltf) {
                const obj = gltf.scene;
                obj.name = `${model}`
                obj.position.y = -1.5
                obj.position.x = 4
                obj.scale.set(size,size*2.2,size)
                obj.castShadow = true;
                obj.receiveShadow = true;
                scene.add(obj)

                setLoading(false);
                mixer = new THREE.AnimationMixer(obj);
                mixer.clipAction(gltf.animations[0]).play();
                animate();
            })

            let req = null

            const animate = () => {
                req = requestAnimationFrame(animate)
                const delta = clock.getDelta();
                mixer.update(delta);
                renderer.render(scene, camera)
                // camera.lookAt(target)
            }

            return () => {
                console.log('unmount')
                cancelAnimationFrame(req)
                renderer.dispose()
            }
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize, false)
        return () => {
            window.removeEventListener('resize', handleWindowResize, false)
        }
    }, [renderer, handleWindowResize])

    return (
        <div 
            className='w-screen h-screen'
            ref={refContainer}
        >
            {loading && (
                <Spinner
                    size='xl'
                    position={'absolute'}
                    left={'50%'}
                    top='50%'
                    className='w-10 h-10'
                />
            )}
        </div>
    )
}

export default ProfileM

