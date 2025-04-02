export function htmlEmailTemplate({
	name,
	email,
	message,
}: {
	name: string;
	email: string;
	message: string;
}) {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Mensaje desde página web JMéndez Constructora S.A</title>
			<style type="text/css">
				/* GENERAL STYLE RESETS */
	
				body,
				#bodyTable {
					height: 100% !important;
					width: 100% !important;
					margin: 0;
					padding: 0;
				}
				img,
				a img {
					border: 0;
					outline: none;
					text-decoration: none;
				}
				.imageFix {
					display: block;
				}
				table,
				td {
					border-collapse: collapse;
				}
	
				/* CLIENT-SPECIFIC RESETS */
	
				.ReadMsgBody {
					width: 100%;
				}
				.ExternalClass {
					width: 100%;
				}
				.ExternalClass,
				.ExternalClass p,
				.ExternalClass span,
				.ExternalClass font,
				.ExternalClass td,
				.ExternalClass div {
					line-height: 100%;
				}
				table,
				td {
					mso-table-lspace: 0pt;
					mso-table-rspace: 0pt;
				}
				img {
					-ms-interpolation-mode: bicubic;
				}
				body,
				table,
				td,
				p,
				a,
				li,
				blockquote {
					-ms-text-size-adjust: 100%;
					-webkit-text-size-adjust: 100%;
				}
	
				/* CUSTOM STYLES */
	
				table {
					border-spacing: 0;
				}
				td {
					padding: 0;
				}
			</style>
		</head>
		<body>
			<table
				id="bodyTable"
				border="0"
				cellpadding="0"
				cellspacing="0"
				height="100%"
				width="100%"
				style="table-layout: fixed"
			>
				<tr>
					<td align="center" valign="top">
						<table
							bgcolor="#ffffff"
							border="0"
							cellpadding="0"
							cellspacing="0"
							width="650"
							style="
								background-color: #ffffff;
								width: 100%;
								max-width: 650px;
								margin: 0 auto;
								border-spacing: 0;
								font-family: sans-serif;
								color: #4a4a4a;
							"
						>
							<tr>
								<td style="font-size: 18px; padding-top: 15px; padding-bottom: 15px; padding-left: 15px; padding-right: 15px">
									<table
										border="0"
										cellpadding="0"
										cellspacing="0"
										align="left"
										valign="center"
									>
										<tr>
											<td style="padding: 0">
												<p style="margin: 0; padding: 10px 0">
													&bull; Name: ${name}
												</p>
												<p style="margin: 0; padding: 10px 0">
													&bull; Email: ${email}
												</p>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td
									align="center"
									valign="center"
									style="font-size: 18px; padding-top: 15px; padding-bottom: 15px; padding-left: 15px; padding-right: 15px; width: 100%"
								>
									<p
										style="
											mso-line-height-rule: exactly;
											padding: 0;
											margin: 0;
											line-height: 30px;
											text-align: justify;
											width: 100%;
											white-space: normal;
											word-break: break-all;
										"
									>
									${message}
									</p>
								</td>
							</tr>
							<tr>
								<td
									align="center"
									valign="center"
									style="padding: padding-top: 0; padding-bottom: 0; padding-left: 15px; padding-right: 15px; font-size: 18px"
								>
									<a
										href="mailto:${email}"
										style="
											display: inline-block;
											text-decoration: none;
											padding: 15px;
											margin: 25px 0;
											font-size: 18px;
											background-color: #ffcb0c;
											color: #4a4a4a;
											border-radius: 8px;
											outline: none;
											border: none;
											text-transform: uppercase;
											letter-spacing: 3px;
											
										"
									>
										Send Message (not reply)
									</a>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</body>
	</html>
	`;
}
