pipeline{

    agent any

    parameters{
        //string(name: 'SPEC', defaultValue: "cypress/e2e/**", description:"enter the script path that you want to execute")
        choice(name: 'SPEC', choices: ['All', 'T01', 'T02'], description: 'enter the script path that you want to execute')
    }

    stages{
        stage('install prerequisite'){
            steps{
                bat "npm install" 
            }
        }
        stage('testing'){
            steps{
                bat "npx cypress run --env tags=@$SPEC" 
            }
        }
        stage('generate report'){
            steps{
                bat "node generate-html-report.js"
            }
        }
        stage('publish report'){
            steps{
                echo "publish reporting in jenkins"
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: false, reportDir: 'cypress/reports', reportFiles: 'cucumber_report.html', reportName: 'Report Cypress', reportTitles: '', useWrapperFileDirectly: true])
            }
        }
    }    
}