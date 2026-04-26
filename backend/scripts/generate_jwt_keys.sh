#!/bin/bash
mkdir -p ../keys
openssl genpkey -algorithm RSA -out ../keys/private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in ../keys/private.pem -out ../keys/public.pem
echo "JWT RS256 keys generated in backend/keys/"
