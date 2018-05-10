<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use GuzzleHttp\Client;

class ApiController extends Controller
{
    /**
     * @Route("/api/products", name="api_products")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiProductsAction(Request $request)
    {
        $serializer = $this->get('serializer');
        $client = new Client();
        $response = $client->request('GET', 'https://eve.theiconic.com.au/catalog/products', [
            'headers' => [
                'Accept'     => 'application/json'
            ]
        ]);
        $response = json_decode($response->getBody(), true);

        return new JsonResponse($serializer->normalize($response['_embedded']['product']));
    }

    /**
     * @Route("/api/product/{sku}", name="api_product")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiProductAction($sku, Request $request)
    {
        $serializer = $this->get('serializer');
        $client = new Client();
        $response = $client->request('GET', 'https://eve.theiconic.com.au/catalog/products/' . $sku, [
            'headers' => [
                'Accept'     => 'application/json'
            ]
        ]);
        $response = json_decode($response->getBody(), true);

        return new JsonResponse($serializer->normalize($response));
    }

    /**
     * @Route("/api/search/{query}/{page}", name="api_search")
     *
     * Needed for client-side navigation after initial page load
     */
    public function apiSearchAction($query, $page, Request $request)
    {
        $serializer = $this->get('serializer');
        $client = new Client();
        $response = $client->request('GET', 'https://eve.theiconic.com.au/catalog/products?q=' . $query . '&page=' . $page . '&page_size=10', [
            'headers' => [
                'Accept'     => 'application/json'
            ]
        ]);
        $response = json_decode($response->getBody(), true);

        return new JsonResponse($serializer->normalize($response));
    }

}
