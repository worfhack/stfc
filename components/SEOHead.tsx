// components/SEOHead.tsx
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    schemaData?: object;
}

const SEOHead = ({
                     title,
                     description,
                     keywords,
                     canonical,
                     schemaData,
                 }: SEOHeadProps) => {
    const lastModified = new Date().toISOString().split("T")[0];

    return (
        <Helmet>
            {/* Titre */}
            {title && <title>{title}</title>}

            {/* Meta description */}
            {description && (
                <meta name="description" content={description} />
            )}

            {/* Meta keywords */}
            {keywords && (
                <meta name="keywords" content={keywords} />
            )}

            {/* Canonical */}
            {canonical && (
                <link rel="canonical" href={canonical} />
            )}

            {/* Last-modified */}
            <meta name="last-modified" content={lastModified} />

            {/* Schema.org JSON-LD */}
            {schemaData && (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
