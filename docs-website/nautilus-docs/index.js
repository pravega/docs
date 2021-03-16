import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Render children only if the specified feature is in the feature list.
// Usage:
//   doc.md:
//     import { IfHaveFeature, IfMissingFeature } from "../../if_have_feature";
//
//     <IfHaveFeature feature="nautilus"><h3>You have nautilus</h3></IfHaveFeature>
//   docusaurus.config.js:
//     module.exports = {customFields: {features: ['my-feature']}, ...};
//
function IfHaveFeature(props) {
    const {siteConfig} = useDocusaurusContext();
    const enabled = siteConfig.customFields.features.includes(props.feature);
    return enabled ? props.children : null;
}

function IfMissingFeature(props) {
    const {siteConfig} = useDocusaurusContext();
    const enabled = !siteConfig.customFields.features.includes(props.feature);
    return enabled ? props.children : null;
}

function SDPVersion(props) {
    const {siteConfig} = useDocusaurusContext();
    return siteConfig.customFields.versions.sdp;
}

export { IfHaveFeature, IfMissingFeature, SDPVersion };
