const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext: any) => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map((e: any) => {
  return e.match(re)[1]
})

export default svgIcons
