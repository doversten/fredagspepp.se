module.exports = {
    plugins: [
        {
            resolve: "gatsby-source-google-docs",
            options: {
                // Mandatory
                // --------
                foldersIds: [process.env.FOLDER_ID], // folders Ids can be found in Google Drive URLs
                config: {
                    api_key: process.env.API_KEY,
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    // Optional
                    // --------
                    access_type: "offline",
                    redirect_uris: [
                        "urn:ietf:wg:oauth:2.0:oob",
                        "http://localhost",
                    ],
                    scope: [
                        "https://www.googleapis.com/auth/documents.readonly", // GoogleDocs API read access
                        "https://www.googleapis.com/auth/drive.metadata.readonly", // GoogleDrive API read access
                    ],
                    token_path: "google-docs-token.json",
                },
                // Optional
                // --------
                fields: ["createdTime"], // https://developers.google.com/drive/api/v3/reference/files#resource
                fieldsMapper: {createdTime: "date", name: "title"}, // To rename fields
            },
        },
        // Use gatsby-transformer-remark to modify the generated markdown
        // Not mandatary, but recommanded to be compliant with gatsby remark ecosystem
        {
            resolve: `gatsby-transformer-remark`,
            options: {
              // CommonMark mode (default: true)
              commonmark: true,
              // Footnotes mode (default: true)
              footnotes: true,
              // Pedantic mode (default: true)
              pedantic: true,
              // GitHub Flavored Markdown mode (default: true)
              gfm: true,
              // Plugins configs
              plugins: [],
            },
          },
    ],
}