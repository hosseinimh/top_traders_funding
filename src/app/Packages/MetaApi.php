<?php

namespace App\Packages;

use App\Facades\Helper;
use Exception;

class MetaApi
{
    private string $baseAddress;
    private string $bearerToken;

    public function __construct()
    {
        $this->baseAddress = 'https://toptradersfunfing.com';
        $this->bearerToken = 'hosseinimh@gmail.com';
    }

    public function fetchAccountData(string $token, string $accountId): mixed
    {
        $url = $this->baseAddress;
        $postFields = [
            'type' => 'forex',
            'token' => $token,
            'accountId' => $accountId,
        ];

        $result = $this->postRequest($url, $postFields);
        if ($result && $result->_result === '1') {
            foreach ($result->accountData->deals->deals as $deal) {
                if (!isset($deal->comment)) {
                    $deal->comment = null;
                }
                if (!isset($deal->symbol)) {
                    $deal->symbol = null;
                }
                if (!isset($deal->magic)) {
                    $deal->magic = null;
                }
                if (!isset($deal->orderId)) {
                    $deal->orderId = null;
                }
                if (!isset($deal->positionId)) {
                    $deal->positionId = null;
                }
                if (!isset($deal->reason)) {
                    $deal->reason = null;
                }
                if (!isset($deal->entryType)) {
                    $deal->entryType = null;
                }
                if (!isset($deal->volume)) {
                    $deal->volume = null;
                }
                if (!isset($deal->price)) {
                    $deal->price = null;
                }
                if (!isset($deal->updateSequenceNumber)) {
                    $deal->updateSequenceNumber = null;
                }
            }
            return $result->accountData;
        }
        return null;
    }

    private function postRequest($url, $postFields)
    {
        try {
            $ch = curl_init($url);
            $postFields = json_encode($postFields);
            $authorization = "Authorization: Bearer " . $this->bearerToken;

            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', $authorization]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);

            $result = curl_exec($ch);
            $curl_errno = curl_errno($ch);
            curl_close($ch);

            if ($curl_errno > 0) {
                return null;
            }

            return $this->parseJsonData($result);
        } catch (Exception $e) {
            Helper::logError($e);
        }

        return null;
    }

    private function parseJsonData($data)
    {
        try {
            return json_decode($data);
        } catch (Exception $e) {
            Helper::logError($e);
        }

        return null;
    }
}
