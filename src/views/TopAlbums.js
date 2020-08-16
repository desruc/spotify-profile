import React from 'react';
import { useSelector } from 'react-redux';

import { selectTopTracks, selectAlbumRange } from '../store/reducer';
import { CHANGE_ALBUM_DATE_RANGE } from '../store/types';

import Container from '../components/Container';
import PageHeader from '../components/PageHeader';
import RangeTabs from '../components/RangeTabs';
import Flex from '../components/Flex';
import FeatureImage from '../components/FeatureImage';

import { useWindowSize } from '../utils/hooks';
import { getViewportName, getTopAlbums, getArtist } from '../utils/helpers';

const TopAlbums = () => {
  // Hooks
  const { width: viewportWidth } = useWindowSize();

  // Redux
  const range = useSelector((state) => selectAlbumRange(state));
  const tracks = useSelector((state) => selectTopTracks(state));

  // Constants
  const sliceRange = {
    mobile: 4,
    tablet: 6,
    desktop: 8,
  };
  const computedAlbums = getTopAlbums(tracks[range]);
  const computedSlice = sliceRange[getViewportName(viewportWidth)];

  const headerActions = (
    <RangeTabs actionType={CHANGE_ALBUM_DATE_RANGE} selected={range} />
  );

  return (
    <main>
      <Container>
        <PageHeader heading="Top Albums" actions={headerActions} />
        <Flex>
          {computedAlbums &&
            computedAlbums.slice(0, computedSlice).map((a) => {
              const artist = getArtist(a[0]);
              const albumTitle = a[0].name;
              return (
                <FeatureImage
                  key={a[0].id}
                  featured
                  image={a[0].images[0].url}
                  label={`${artist} - ${albumTitle}`}
                />
              );
            })}
        </Flex>
        <Flex>
          {computedAlbums &&
            computedAlbums.slice(computedSlice).map((a) => {
              const artist = getArtist(a[0]);
              const albumTitle = a[0].name;
              return (
                <FeatureImage
                  key={a[0].id}
                  image={a[0].images[0].url}
                  label={`${artist} - ${albumTitle}`}
                />
              );
            })}
        </Flex>
      </Container>
    </main>
  );
};

export default TopAlbums;