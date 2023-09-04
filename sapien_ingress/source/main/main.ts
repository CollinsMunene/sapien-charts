import * as k8s from '@kubernetes/client-node';
import { IngressController } from 'sapienafrica-ingress-controller-core/IngressController';
import { ConsoleLogExporter } from 'sapienafrica-ingress-controller-plugin-consolelogger/ConsoleLogExporter';
import { OpenIDConnectPlugin } from 'sapienafrica-ingress-controller-plugin-openid/OpenIDConnectPlugin';
import { BasicAuthPlugin } from 'sapienafrica-ingress-controller-plugin-basicauth/BasicAuthPlugin';
import { K8sCRDSessionStore } from 'sapienafrica-ingress-controller-plugin-k8scrdsession/K8sCRDSessionStore';

async function main()
{
    try
    {
        let kc = new k8s.KubeConfig();
        kc.loadFromDefault();

        let server = new IngressController(
            new ConsoleLogExporter(),
            kc,
            new K8sCRDSessionStore(kc),
            [
                // new OpenIDConnectPlugin(),
                new BasicAuthPlugin()
            ]
        );
        await server.run();
    }
    catch (e)
    {
        console.log(e);
    }
}

main();