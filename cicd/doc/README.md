## Jenkins Pipelines

[Legacy Jenkins](http://jenkinsscmidc01-prod.idc1.level3.com:8080/view/PORTAL-FRAMEWORK/job/portal-framework/job/po-enterprise-nav/) can be reached with CTL Global Protect VPN only. Log in with CUID credentials.

### Pull requests

Pull requests are handled with a multibranch pipeline [here] (http://jenkinsscmidc01-prod.idc1.level3.com:8080/view/PORTAL-FRAMEWORK/job/portal-framework/job/po-adaptive-network/job/po-adaptive-network/)

* Pipeline configuration :
    * Multibranch pipeline job configuration details [here](./po-enterprise-nav.xml)
    * Jenkinsfile available [here] (../jenkins/Jenkinsfile)

### Pull request garbage collector

Garbage from closed pull requests is handled with a multibranch pipeline [here] (http://jenkinsscmidc01-prod.idc1.level3.com:8080/view/PORTAL-FRAMEWORK/job/portal-framework/job/po-adaptive-network/job/po-adaptive-network-garbage-collector/)

* Pipeline configuration :
    * Multibranch pipeline job configuration details [here] (./po-enterprise-nav_garbage_collector.xml)
    * Jenkinsfile available  [here] (../jenkins/prune/Jenkinsfile)
