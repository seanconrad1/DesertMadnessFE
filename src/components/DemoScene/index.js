import * as THREE from "three";

import React from "react";
import React3 from "react-three-renderer";
import ObjectModel from 'react-three-renderer-objects';
import exampleModel from "../../assets/Monster_truck.obj";

class DemoScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 10),
      groupRotation: new THREE.Euler(0, 0, 0),
      scene: {},
      counter:0,
      planeRotation: new THREE.Euler(),
      whiteLineMovement: new THREE.Vector3(.13,3,2),
      carMovement: new THREE.Vector3(0,-.5,8),
      }
    }

  componentDidMount() {
    const { scene } = this.refs;
    this.setState({ scene });
  }

  _onAnimate = () => {
    this.setState({
      counter: this.state.counter + .1,
      whiteLineMovement: new THREE.Vector3(
        this.state.whiteLineMovement.x = .13,
        this.state.whiteLineMovement.y - .1,
        this.state.whiteLineMovement.z + .1,
      )
    }, () => this.resetter())
  }

  resetter = () =>{
    Math.floor(this.state.counter) === 5.0 ? this.setState({counter:0, whiteLineMovement: new THREE.Vector3(.13,3, 2)}) : null
  }

  moveCar = (e) => {
    console.log(e.key)
    if (e.key === 'ArrowLeft') {
      this.setState({
        carMovement: new THREE.Vector3(
          this.state.carMovement.x - .05,
          this.state.carMovement.y = -.15,
          this.state.carMovement.z = 8
          )
      })
    }else if (e.key === 'ArrowRight') {
      this.setState({
        carMovement: new THREE.Vector3(
          this.state.carMovement.x + .05,
          this.state.carMovement.y = -.15,
          this.state.carMovement.z = 8
          )
      })
    }else if (e.key === 'ArrowUp') {
      this.setState({
        carMovement: new THREE.Vector3(
          this.state.carMovement.x = .05,
          this.state.carMovement.y - -.15,
          this.state.carMovement.z - .1
          )
      })
    }else if (e.key === 'ArrowDown') {
      this.setState({
        carMovement: new THREE.Vector3(
          this.state.carMovement.x = .05,
          this.state.carMovement.y + -.15,
          this.state.carMovement.z + .1
          )
      })
    }
  }

  canvasRef = (canvas) =>{
    canvas.addEventListener("keydown", e => this.moveCar(e));
      canvas.tabIndex = 1; // not sure what this means. Got it from ToxicFork, the dev for React-Three-Renderer
  }

  render() {

    let width = window.innerWidth;
    let height = window.innerHeight;

    return (
      <React3
        mainCamera="camera"
        antialias
        shadowMapEnabled
        width={width}
        height={height}
        alpha={true}
        onAnimate={this._onAnimate}
        canvasRef={this.canvasRef}
      >
        <scene ref="scene">
          <perspectiveCamera
            key={`perspectiveCamera`}
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.state.cameraPosition}
            lookAt={new THREE.Vector3(0, 0, 0)}
          />

          <mesh rotation={new THREE.Euler(2,3.135)} >
            <planeGeometry width={8} height={120} widthSegments={300} heightSegments={300}/>
            <meshBasicMaterial color={'grey'}/>
          </mesh>

          <mesh rotation={new THREE.Euler(2,3.135)} position={this.state.whiteLineMovement} >
            <planeGeometry width={.2} height={3}/>
            <meshBasicMaterial color={'white'}/>
          </mesh>

          <group>
            <spotLight
              key={`Light 1`}
              color={0xffffff}
              position={new THREE.Vector3(0, 300, 0)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              castShadow
              penumbra={2}
              intensity={0.2}
              shadowMapWidth={10240}
              shadowMapHeight={10240}
            />

            <directionalLight
              key={`Light 2`}
              color={0xffffff}
              position={new THREE.Vector3(0, 500, 100)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.5}
            />

            <spotLight
              key={`Light 3`}
              color={0xffffff}
              position={new THREE.Vector3(0, 100, 2000)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.35}
            />

            <spotLight
              key={`Light 4`}
              color={0xffffff}
              position={new THREE.Vector3(-500, 0, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.1}
            />

            <spotLight
              key={`Light 5`}
              color={0xffffff}
              position={new THREE.Vector3(500, 0, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.1}
            />

            <spotLight
              key={`Light 6`}
              color={0xffd0b1}
              position={new THREE.Vector3(-500, 450, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.375}
            />

            <spotLight
              key={`Light 7`}
              color={0x80ecff}
              position={new THREE.Vector3(500, 450, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.375}
            />
          </group>

          <group name="exampleGroup" rotation={new THREE.Euler(.5, 59.7, 0)} position={this.state.carMovement}>
            <ObjectModel
              name="exampleObject"
              model={exampleModel}
              // material color={'black'}
              scene={this.state.scene}
              scale={new THREE.Vector3(.1, .1, .1)}
              group="exampleGroup"
            />
          </group>
        </scene>
      </React3>
    );
  }
}

export default DemoScene;
