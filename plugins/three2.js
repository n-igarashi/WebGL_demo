const THREE = require('three')

const OrbitControls = require('three-orbit-controls')(THREE)

export default class three{
  constructor({canvas}){
    console.dir(canvas)
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setClearColor( 0xffffff, 1 )

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 1000
    )
    this.camera.position.set(0, 0, 50)
    
    new OrbitControls(this.camera, this.renderer.domElement)

    // const directionalLight = new THREE.DirectionalLight(0xffffff);
    // directionalLight.position.set(100, 100, 100);
    // this.scene.add(directionalLight);
    // const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
    // this.scene.add(pointLight);


    this.renderer.setSize(canvas.clientHeight, canvas.clientWidth)
    canvas.appendChild(this.renderer.domElement)

    const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 )
    const material = new THREE.MeshLambertMaterial({color: 0x6699FF})
    const torusKnot = new THREE.Mesh( geometry, material )
    this.scene.add( torusKnot )

    this.render()
  }

  render() {
    requestAnimationFrame(() => this.render())
    this.renderer.render(this.scene, this.camera);
  }
}
