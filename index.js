const canvas = document.getElementById("canvas")
canvas.height = canvas.clientHeight
canvas.width = canvas.clientWidth
const ctx = canvas.getContext("2d")
const eraserButton = document.querySelector('#eraser')

let eraseModeOn = false
const erase = function(e) {
  console.log(e.target)
  eraseModeOn = true
  e.target.disabled = true
  if (e.target.disabled) {e.target.style.background = 'grey'}
  e.target.textContent = 'Erase Mode On'
  // e.target.disabled = eraseModeOn ? true : false
  ctx.globalCompositeOperation = 'destination-out'
  canvas.style.cursor = `url('cursor.cur'), auto`
  ctx.lineWidth = 55
}
let prevX = null
let prevY = null

ctx.lineWidth = 5

let draw = false

let colors = document.querySelectorAll(".color")
colors = Array.from(colors)
colors.forEach(color => {
    color.addEventListener("click", () => {
      eraseModeOn = false
      eraserButton.disabled = false
      eraserButton.style.background = 'black'
      eraserButton.textContent = 'Click to use Eraser'
      ctx.globalCompositeOperation = 'source-over'
      canvas.style.cursor = `initial`
        ctx.strokeStyle = color.dataset.color
        ctx.lineWidth = 5
        for (const eachColor of colors) {
          eachColor.style.border = 'none'
        }
        color.style.border = `5px solid purple`
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height) //erases ALL drawings within canvas area
})

// Saving drawing as image
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    // what ever name you specify here
    // the image will be saved as that name
    a.download = "sketch.png"
    a.click() //simulates an HTML element being clicked!
})

window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", (e) => {
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    let currentX = e.clientX
    let currentY = e.clientY

    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    prevX = currentX
    prevY = currentY
})

const input = document.querySelector('#color-input > input')
input.addEventListener('input', function() {
    ctx.strokeStyle = this.value
    eraserButton.disabled = false
    eraserButton.style.background = 'black'
    eraserButton.textContent = `Click to use Eraser`
    ctx.globalCompositeOperation = 'source-over'
    canvas.style.cursor = `initial`
    // ctx.strokeStyle = color.dataset.color
    ctx.lineWidth = 5
    for (const eachColor of colors) {
    eachColor.style.border = 'none'
  }
})
