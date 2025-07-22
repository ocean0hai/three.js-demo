const modules = import.meta.glob("@/pages/**/**.vue")

export function setupRouter() {
  for (const key in modules) {
    const name = key.replace(/^\.\/pages/, "").replace(/\.\w+$/, "")
    if (name === "/") {
      continue
    }
    const component = modules[key]
    // console.log(name)
  }
}