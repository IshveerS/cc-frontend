import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Tab,
  Box,
  Tabs,
  List,
  Card,
  Stack,
  Button,
  Popper,
  Divider,
  ListItem,
  Container,
  IconButton,
  Typography,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import useGetCampaigns from 'src/hooks/use-get-campaigns';

import { timelineHelper } from 'src/utils/timelineHelper';
import { filterTimelineAdmin } from 'src/utils/filterTimeline';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import CampaignDetailBrand from '../campaign-detail-brand';
import CampaignDetailPitch from '../campaign-detail-pitch';
import CampaignDetailContent from '../campaign-detail-content';

const CampaignDetailView = ({ id }) => {
  const settings = useSettingsContext();
  const router = useRouter();
  const { campaigns } = useGetCampaigns();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const idd = open ? 'simple-popper' : undefined;

  const currentCampaign = campaigns && campaigns.filter((campaign) => campaign.id === id)[0];

  let timeline =
    currentCampaign?.defaultCampaignTimeline || currentCampaign?.customCampaignTimeline;

  timeline = filterTimelineAdmin(timeline);

  const [currentTab, setCurrentTab] = useState('campaign-content');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {[
        { label: 'Campaign Content', value: 'campaign-content' },
        { label: 'Creator', value: 'creator' },
        { label: 'Brand', value: 'brand' },
        { label: 'Shortlisted', value: 'shortlist' },
        { label: 'Pitch', value: 'pitch' },
      ].map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'pitch' ? (
              <Label variant="filled">{currentCampaign?.Pitch.length}</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if (open) {
        setAnchorEl(null);
      }
    });
  }, [open]);

  const isDue = (dueDate) => {
    const startReminderDate = dayjs(dueDate).subtract(2, 'day');

    if (startReminderDate <= dayjs() && dayjs() < dayjs(dueDate)) {
      return true;
    }
    return false;
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        startIcon={<Iconify icon="material-symbols:arrow-back-ios" width={12} sx={{ ml: 1 }} />}
        onClick={() => router.push(paths.dashboard.campaign.view)}
        sx={{
          mb: 3,
        }}
      >
        Back
      </Button>

      {renderTabs}

      {currentTab === 'campaign-content' && <CampaignDetailContent campaign={currentCampaign} />}
      {currentTab === 'creator' && <CampaignDetailContent campaign={currentCampaign} />}
      {currentTab === 'brand' && (
        <CampaignDetailBrand brand={currentCampaign?.brand ?? currentCampaign?.company} />
      )}
      {currentTab === 'shortlisted' && <CampaignDetailContent campaign={currentCampaign} />}
      {currentTab === 'pitch' && (
        <CampaignDetailPitch
          pitches={currentCampaign?.Pitch}
          shortlisted={currentCampaign?.ShortListedCreator}
        />
      )}

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          border: (theme) => `1px solid ${theme.palette.background.paper}`,
        }}
        onClick={(event) => {
          setAnchorEl(anchorEl ? null : event.currentTarget);
        }}
      >
        <Iconify icon="hugeicons:apple-reminder" width={30} />
      </IconButton>
      <Popper id={idd} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            mb: 1,
            mr: 5,
            width: 450,
            border: (theme) => `1px solid ${theme.palette.primary.light}`,
          }}
          component={Card}
        >
          <Stack alignItems="center" direction="row" justifyContent="space-between">
            <Stack alignItems="center" spacing={1} direction="row">
              <Iconify icon="material-symbols:info-outline" />
              <Typography variant="h5">Reminders</Typography>
            </Stack>
            <Typography variant="caption">{dayjs().format('ll')}</Typography>
          </Stack>
          <Divider
            sx={{
              borderStyle: 'dashed',
              my: 1.5,
            }}
          />
          <List>
            <ListItem>
              {isDue(
                timelineHelper(currentCampaign?.campaignBrief?.startDate, timeline?.filterPitch)
              ) && (
                <ListItemIcon>
                  <Iconify icon="clarity:warning-solid" color="warning.main" />
                </ListItemIcon>
              )}
              <ListItemText
                primary="Filter Pitch"
                secondary={`Due ${timelineHelper(currentCampaign?.campaignBrief?.startDate, timeline?.filterPitch)}`}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                }}
              />
            </ListItem>
            <ListItem>
              {isDue(
                timelineHelper(
                  currentCampaign?.campaignBrief?.startDate,
                  timeline?.shortlistCreator
                )
              ) && (
                <ListItemIcon>
                  <Iconify icon="clarity:warning-solid" color="warning.main" />
                </ListItemIcon>
              )}
              <ListItemText
                primary="Shortlist Creator"
                secondary={`Due ${timelineHelper(currentCampaign?.campaignBrief?.startDate, timeline?.shortlistCreator)}`}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                }}
              />
            </ListItem>
            <ListItem>
              {isDue(
                timelineHelper(
                  currentCampaign?.campaignBrief?.startDate,
                  timeline?.feedBackFirstDraft
                )
              ) && (
                <ListItemIcon>
                  <Iconify icon="clarity:warning-solid" color="warning.main" />
                </ListItemIcon>
              )}
              <ListItemText
                primary="Feedback First Draft"
                secondary={`Due ${timelineHelper(currentCampaign?.campaignBrief?.startDate, timeline?.feedBackFirstDraft)}`}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                }}
              />
            </ListItem>
            <ListItem>
              {isDue(
                timelineHelper(
                  currentCampaign?.campaignBrief?.startDate,
                  timeline?.feedBackFinalDraft
                )
              ) && (
                <ListItemIcon>
                  <Iconify icon="clarity:warning-solid" color="warning.main" />
                </ListItemIcon>
              )}
              <ListItemText
                primary="Feedback First Draft"
                secondary={`Due ${timelineHelper(currentCampaign?.campaignBrief?.startDate, timeline?.feedBackFinalDraft)}`}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                }}
              />
            </ListItem>
            <ListItem>
              {isDue(timelineHelper(currentCampaign?.campaignBrief?.startDate, timeline?.qc)) && (
                <ListItemIcon>
                  <Iconify icon="clarity:warning-solid" color="warning.main" />
                </ListItemIcon>
              )}
              <ListItemText
                primary="Feedback First Draft"
                secondary={`Due ${timelineHelper(currentCampaign?.campaignBrief?.startDate, timeline?.qc)}`}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Popper>
    </Container>
  );
};

export default CampaignDetailView;

CampaignDetailView.propTypes = {
  id: PropTypes.string,
};
