import { Router } from "express";
import { getMock } from "../controllers/tenant";
import { login } from "../controllers/login";
import { verifyJWT, verifyXPayer } from "../utils/jwt";
import { createAccount, getAccountByDoc, getAccountById, getStatement } from "../controllers/account";
import { getPixKey, transferDoc, transferTed, createBillet, transferPix, tranferInternal } from "../controllers/transactions";

const mainRouter = Router();

/**
 * @swagger
 * /tenant:
 *   post:
 *     summary: Create a tenant and returns tenant details.
 *     tags: [Tenant]
 *     parameters:
 *       - in: header
 *         name: X-Mock
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tenant created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 clientId:
 *                   type: string
 *                 clientSecret:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 */
mainRouter.post('/tenant', getMock);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to get access token.
 *     
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *               clientSecret:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns an access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
mainRouter.post('/auth/login', login);

/**
 * @swagger
 * /account:
 *   post:
 *     summary: Create a new bank account.
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               accountType:
 *                 type: string
 *               document:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 tenantId:
 *                   type: string
 *                 accountType:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: PENDING_KYC
 *                 document:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 branch:
 *                   type: string
 *                   example: 0001
 *                 number:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
mainRouter.post('/account', verifyJWT, createAccount);

/**
 * @swagger
 * /account/{id}:
 *   get:
 *     summary: Get account by ID.
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 tenantId:
 *                   type: string
 *                 accountType:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: PENDING_KYC
 *                 document:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 branch:
 *                   type: string
 *                   example: 0001
 *                 number:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Account not found.
 */
mainRouter.get('/account/:id', verifyJWT,  getAccountById);

/**
 * @swagger
 * /account/{id}/statement:
 *   get:
 *     summary: Get account statement.
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accountId:
 *                   type: string
 *                 balance:
 *                   type: number
 *                 transactions:
 *                   type: array
 *                   items: {}
 *                   example: []
 *       404:
 *         description: Statement not found.
 */
mainRouter.get('/account/:id/statement', verifyJWT, getStatement);

/**
 * @swagger
 * /account/document/{document}:
 *   get:
 *     summary: Get account by document.
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: document
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account details by document.
 *       404:
 *         description: Account not found.
 */
mainRouter.get('/account/document/:document', verifyJWT, getAccountByDoc);

/**
 * @swagger
 * /transaction/ted:
 *   post:
 *     summary: Perform a TED transfer.
 *     tags: [Transaction]
 *     parameters:
 *       - in: header
 *         name: X-Payer-Id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               recipientName:
 *                 type: string
 *               recipientDocument:
 *                 type: string
 *               recipientBank:
 *                 type: string
 *               recipientBranch:
 *                 type: string
 *               recipientAccount:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: TED transfer successful.
 */
mainRouter.post('/transaction/ted', verifyJWT, verifyXPayer, transferTed);

/**
 * @swagger
 * /transaction/doc:
 *   post:
 *     summary: Perform a DOC transfer.
 *     tags: [Transaction]
 *     parameters:
 *       - in: header
 *         name: X-Payer-Id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               recipientName:
 *                 type: string
 *               recipientDocument:
 *                 type: string
 *               recipientBank:
 *                 type: string
 *               recipientBranch:
 *                 type: string
 *               recipientAccount:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: DOC transfer successful.
 */
mainRouter.post('/transaction/doc', verifyJWT, verifyXPayer, transferDoc);

/**
 * @swagger
 * /transaction/billet:
 *   post:
 *     summary: Generate a bank billet.
 *     tags: [Transaction]
 *     parameters:
 *       - in: header
 *         name: X-Payer-Id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               billetCode:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bank billet created.
 */
mainRouter.post('/transaction/billet', verifyJWT, verifyXPayer, createBillet);

/**
 * @swagger
 * /transaction/pix/{pixKey}:
 *   get:
 *     summary: Get a PIX key.
 *     tags: [Transaction]
 *     parameters:
 *       - in: header
 *         name: X-Payer-Id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pixKey
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PIX key details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 pixKey:
 *                   type: string
 *                 recipientName:
 *                   type: string
 *                 recipientDocument:
 *                   type: string
 *                 e2eId:
 *                   type: string
 *       404:
 *         description: PIX key not found.
 */
mainRouter.get('/transaction/pix/:pixKey', verifyJWT, verifyXPayer, getPixKey);

/**
 * @swagger
 * /transaction/pix/{accountId}/pay:
 *   post:
 *     summary: Perform a PIX payment.
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: string
 *       - in: header
 *         name: X-Payer-Id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               pixKey:
 *                 type: string
 *               description:
 *                 type: string
 *               e2eId:
 *                 type: string
 *     responses:
 *       200:
 *         description: PIX payment successful.
 */
mainRouter.post('/transaction/pix/:accountId/pay', verifyJWT, verifyXPayer, transferPix);

/**
 * @swagger
 * /transaction/internal:
 *   post:
 *     summary: Perform an internal transfer.
 *     tags: [Transaction]
 *     parameters:
 *       - in: header
 *         name: X-Payer-Id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sourceAccountId:
 *                 type: string
 *               targetAccountId:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Internal transfer successful.
 */
mainRouter.post('/transaction/internal', verifyJWT, verifyXPayer, tranferInternal);

export default mainRouter;
