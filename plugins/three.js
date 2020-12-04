const THREE = require('three')

export default class three{
  constructor({canvas}){
    console.dir(canvas)
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setClearColor( 0xffffff, 1 )

    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 1000
    )
    this.camera.position.set(0, 0, 2)
    
    this.renderer.setSize(canvas.clientHeight, canvas.clientWidth)
    canvas.appendChild(this.renderer.domElement)

    const geometry1 = new THREE.Geometry()
    geometry1.vertices.push(
      new THREE.Vector3( -1,  1, 0 ),
      new THREE.Vector3( -1, -1, 0 ),
      new THREE.Vector3(  1, -1, 0 )
    );
    geometry1.faces.push( new THREE.Face3( 0, 1, 2 ) );

    geometry1.computeBoundingSphere();
    const material1 =  new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const Triangle =  new THREE.Mesh(geometry1,material1);
    this.scene.add( Triangle );

    this.render()
  }

  render() {
    requestAnimationFrame(() => this.render())
    this.renderer.render(this.scene, this.camera);
  }
}
