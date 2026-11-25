"use client";
import ToolWorkspace from "./ToolWorkspace";
import { Closing, Faq, ItemList, Lead, Section, Steps } from "./Article";
import { getTool } from "./tools";
import { ToolArt } from "./illustrations";

/** A tool page: the workspace, then the page's own explanatory copy. */
export default function ToolPage({ toolId, title, intro, about, why, whyItems, featuresHeader, features, useHeader, steps, cta, faq }) {
  const tool = getTool(toolId);
  return (
    <>
      <ToolWorkspace toolId={toolId} title={title} />

      {intro?.[0]?.desc && <Lead>{intro[0].desc}</Lead>}

      {about?.map((item, index) => (
        <Section key={`about-${index}`} title={item.header}>
          {item.desc}
        </Section>
      ))}

      {why?.map((item, index) => (
        <Section key={`why-${index}`} title={item.title} art={index === 0 ? <ToolArt toolId={toolId} /> : null}>
          {item.desc}
          <ItemList items={whyItems} label={tool.label} />
        </Section>
      ))}

      {featuresHeader?.map((item, index) => (
        <Section key={`features-${index}`} title={item.title}>
          {item.desc}
          <ItemList items={features} label={tool.label} />
        </Section>
      ))}

      {useHeader?.map((item, index) => (
        <Section key={`use-${index}`} title={item.title}>
          {item.desc}
          <Steps steps={steps} />
        </Section>
      ))}

      <Faq items={faq} />

      {cta?.[0] && <Closing heading={cta[0].header} text={cta[0].desc} />}
    </>
  );
}
