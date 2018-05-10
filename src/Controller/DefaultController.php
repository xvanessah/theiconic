<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use GuzzleHttp\Client;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(SerializerInterface $serializer)
    {
        
        $client = new Client();
        $response = $client->request('GET', 'https://eve.theiconic.com.au/catalog/products', [
            'headers' => [
                'Accept'     => 'application/json'
            ]
        ]);
        $response = json_decode($response->getBody(), true);

        // Add in error handling

        return $this->render('index.html.twig', [
            'props' => $serializer->normalize(['products' => $response['_embedded']['product']]),   
        ]);
    }

    /**
     * @Route("/product/{sku}", name="product")
     */
    public function showAction($sku, Request $request, SerializerInterface $serializer)
    {

        $client = new Client();
        $response = $client->request('GET', 'https://eve.theiconic.com.au/catalog/products/' . $sku, [
            'headers' => [
                'Accept'     => 'application/json'
            ]
        ]);
        $response = json_decode($response->getBody(), true);

        // Add in error handling

        return $this->render('index.html.twig', [
            'props' => $serializer->normalize(['product' => $response]),   
        ]);
    }

}
