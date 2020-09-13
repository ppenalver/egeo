@Library('libpipelines@master') _

hose {
   EMAIL = 'front'
   MODULE = 'egeo'
   DEVTIMEOUT = 30
   RELEASETIMEOUT = 30
   REPOSITORY = 'github.com/egeo'
   LANG = 'typescript'
   DOWNLOADS_USER = "egeodownload"

   DEV = {
      config ->
         doCompile(config)
         doUT(config)
         doPackage(config)

         parallel(
            QC: {
               doStaticAnalysis(config)
               doCoverallsAnalysis(config)
            },
            DEPLOY: {
               doDeploy(config)
            },
            failFast: config.FAILFAST
         )

         doPublishStatics(config, "dist/egeo-demo", "egeo", true, true)
   }
}
