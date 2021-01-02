import MasterPageExample from "components/website/master/MasterPageExample";
import CONFIG from "web.config";
import BasicLayout from "components/diginext/layout/BasicLayout";
import AppLink from "components/diginext/link/AppLink";
import Header from "components/website/elements/Header";

export default function DemoHome(props) {
  // console.log(props);
  // console.log(CONFIG);

  return (
    <div>
      <ul>
        <li>
          <AppLink href="/examples/list-layout">List layout (Horizontal, Vertical, Grid)</AppLink>
        </li>
        <li>
          <AppLink href="/examples/request-api">How to fetch API for data</AppLink>
        </li>
        <li>
          <AppLink href="/examples/dynamic/12345">Parsing dynamic URL params</AppLink>
        </li>
        <li>
          <AppLink href="/examples/responsive">Responsive example (ListView)</AppLink>
        </li>
        <li>
          <AppLink href="/examples/next-scroll">Next Scroll Hook (get scroll position of an element)</AppLink>
        </li>
        <li>
          <AppLink href="/examples/next-offset">
            Next Offset Hook (get relative offset of element with another element)
        </AppLink>
        </li>
        <li>
          <AppLink href="/examples/next-scroll-trigger">Next Scroll Trigger Hook (React Spring Parallax)</AppLink>
        </li>
        <li>
          <AppLink href="/examples/animation">Animation</AppLink>
        </li>
        <li>
          <AppLink href="/examples/test-qr">QR TEST</AppLink>
        </li>
      </ul>
    </div>
  );
}
