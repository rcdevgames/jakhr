pipeline {
    agent { label 'master' }
    stages {
        stage('Build and deploy for prooduction') {
            when {
                branch 'staging' 
            }
            steps {
                sh '''
                    rm -rf ./.env
                    cp /home/jenkins/project/jakhr/fe/.env-staging ./.env

                    if [ "$(docker ps -a -q -f name=jakhr-fe-staging)" ]; then
                        docker stop jakhr-fe-staging
                        docker rm jakhr-fe-staging
                    fi
                    docker build -t jakhr-fe-staging .
                    docker run -d -p 8012:80 --name jakhr-fe-staging jakhr-fe-staging
                '''
                
            }
        }
    }
}
