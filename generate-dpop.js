// generate-dpop.js
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';

const HTU = process.env.DPOP_HTU || 'https://example.com/secure'; // Customize or override with env
const HTM = process.env.DPOP_HTM || 'GET';

async function generateDpopProof() {
  const { publicKey, privateKey } = await generateKeyPair('ES256');
  const jwk = await exportJWK(publicKey);

  const dpopJwt = await new SignJWT({
    htu: HTU,
    htm: HTM,
    jti: uuidv4(),
  })
    .setProtectedHeader({ alg: 'ES256', typ: 'dpop+jwt', jwk })
    .setIssuedAt()
    .sign(privateKey);

  console.log('\n=== DPoP JWT Proof ===\n');
  console.log(dpopJwt);
  console.log('\nPaste this in your Postman DPoP header.');
}

generateDpopProof();
