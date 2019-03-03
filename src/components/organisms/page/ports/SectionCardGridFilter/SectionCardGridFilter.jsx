/*
 * Copyright (C) 2018-present Arctic Ice Studio <development@arcticicestudio.com>
 * Copyright (C) 2018-present Sven Greb <development@svengreb.de>
 *
 * Project:    Nord Docs
 * Repository: https://github.com/arcticicestudio/nord-docs
 * License:    MIT
 */

import React, { useState } from "react";
import { PoseGroup } from "react-pose";

import { Search } from "atoms/core/vectors/icons";
import FeatureDuo, { Headline, Text, Visualization } from "molecules/page/shared/FeatureDuo";
import { WaveFooter } from "atoms/core/vectors/divider";
import { ROUTE_PORTS } from "config/routes/mappings";
import Section, { Content } from "containers/core/Section";
import { usePortsMetadata } from "hooks";
import { sectionIdFor } from "utils";

import Card from "./Card";
import { Grid, SearchIcon, SearchInput, SearchInputBox } from "./styled";
import Subline from "../shared/Subline";

const SECTION_ID = sectionIdFor(ROUTE_PORTS, 1);

/**
 * The section component that renders a filterable grid of port project cards.
 *
 * @author Arctic Ice Studio <development@arcticicestudio.com>
 * @author Sven Greb <development@svengreb.de>
 * @since 0.9.0
 */
export default function SectionCardGridFilter(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const portsMetadata = usePortsMetadata();
  const [ports, setPorts] = useState(portsMetadata);

  function filter(term) {
    return portsMetadata.filter(port => port.searchTerms.some(portTerm => portTerm.includes(term.toLowerCase())));
  }

  function handleSearchTokenChange({ target: { value: term } }) {
    setSearchTerm(term);
    setPorts(filter(term));
  }

  return (
    <Section id={SECTION_ID} variant="secondary" {...props}>
      <Content centered>
        <FeatureDuo verticalOnly>
          <Text verticalOnly>
            <Headline large>All ports at a glance</Headline>
            <Subline>
              Find the port project for your beloved applications and libraries from Nord&lsquo;s large selection of
              supported tech stacks.
            </Subline>
          </Text>
          <Visualization>
            <SearchInputBox>
              <SearchIcon svgComponent={Search} />
              <SearchInput
                onChange={handleSearchTokenChange}
                placeholder="Search…"
                type="text"
                value={searchTerm}
                {...props}
              />
            </SearchInputBox>
            <Grid>
              <PoseGroup>
                {ports.map(
                  ({
                    gitHubRepositoryUrl,
                    logoComponent: SvgLogo,
                    name,
                    projectName,
                    releaseLatest,
                    stargazers,
                    url
                  }) => (
                    <Card
                      key={name}
                      gitHubRepositoryUrl={gitHubRepositoryUrl}
                      name={name}
                      projectName={projectName}
                      releaseLatest={releaseLatest}
                      stargazers={stargazers}
                      svgComponent={SvgLogo}
                      url={url}
                    />
                  )
                )}
              </PoseGroup>
            </Grid>
          </Visualization>
        </FeatureDuo>
      </Content>
      <WaveFooter />
    </Section>
  );
}
