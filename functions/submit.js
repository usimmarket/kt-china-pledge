exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    const payload = JSON.parse(event.body || '{}');
    const name = String(payload.name || '').trim();
    const date = String(payload.date || '').trim();
    const pdfBase64 = String(payload.pdfBase64 || '');

    if (!name || !date || !pdfBase64) {
      return json({ error: 'Missing required fields' }, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const mailTo = process.env.MAIL_TO || 'kukidream@gmail.com';
    const mailFrom = process.env.MAIL_FROM || 'USIMMARKET <onboarding@resend.dev>';

    if (!apiKey) {
      return json({ error: 'RESEND_API_KEY is not configured' }, 500);
    }

    const safeName = name.replace(/[\\/:*?"<>|]/g, '_').slice(0, 40);
    const filename = `KT中国留学生确认书_${safeName}.pdf`;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [mailTo],
        subject: `[KT中国留学生确认书] 서명 완료 - ${name}`,
        text: [
          'KT中国留学生促销1年合约及名义变更确认书已提交。',
          '',
          `姓名: ${name}`,
          `提交日期: ${date}`,
          `接收邮箱: ${mailTo}`
        ].join('\n'),
        attachments: [
          {
            filename,
            content: pdfBase64
          }
        ]
      })
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      return json({ error: 'Email send failed', detail }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    return json({ error: 'Server error', detail: String(error && error.message ? error.message : error) }, 500);
  }
};

function json(body, statusCode = 200) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(body)
  };
}
