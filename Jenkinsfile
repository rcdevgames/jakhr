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

        stage('Build and deploy for prod') {
            when {
                branch 'prod' 
            }
            steps {
                sh '''
                    rm -rf ./.env
                    cp /home/jenkins/project/jakhr/fe/.env ./.env

                    rsync -az . root@10.20.31.2:/root/fe
                    
                    ssh  -o StrictHostKeyChecking=no  root@10.20.31.2 "cd /root/fe;sh deploy.sh"
                '''
                
            }
        }
    }
}
