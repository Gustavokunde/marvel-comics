import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import { useTranslation } from 'react-i18next';
import { Character } from '../../interfaces/character';
import { colors } from '../../utils/colors';

const ComicsByCharacterChart = ({
  characters,
}: {
  characters: Character[];
}) => {
  const { t } = useTranslation(['characters-list']);

  const dataChart = {
    children: characters?.map((character) => ({
      name: character.name,
      value: character.comics?.available,
    })),
  };

  return characters?.length ? (
    <section
      className="
     w-full flex flex-col items-center
     bg-white rounded p-4
     ease-in duration-300 hover:scale-150 z-50
    "
    >
      <h2 className="mb-2">{t('chartTitle')}</h2>
      <div className="h-72 w-[800px] max-h-screen max-w-screen">
        <ResponsiveCirclePacking
          data={dataChart}
          id="name"
          value="value"
          padding={4}
          enableLabels={true}
          labelsSkipRadius={10}
          labelTextColor={colors.lightGray}
          colors={[colors.darkGreen, colors.lightGreen]}
          borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
          animate={true}
        />
      </div>
    </section>
  ) : null;
};

export default ComicsByCharacterChart;
