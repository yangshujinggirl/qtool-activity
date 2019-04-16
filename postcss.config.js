module.exports = {
    plugins:{
      'postcss-pxtorem':{
        rootValue:100,
        replace:true,
        propList:['*']
      },
      'postcss-cssnext':{
        browsers:'last 3 versions',
        features:{
          rem:{
            // 这个地方用来兼容 第三方库使用rem来定义，但是rem使用的标准值不同
            rootValue:'100',
            replace:false
          }
        }
      }
    }
}
